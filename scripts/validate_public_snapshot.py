"""Validate the public snapshot's structure and integrity, not scientific truth."""
from pathlib import Path
import hashlib
import json
import re
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
def read(p): return json.loads((ROOT/p).read_text(encoding='utf-8-sig'))

def validate():
    manifest = read('PUBLICATION_MANIFEST.json')
    entries = {e['path']: e for e in manifest['files']}
    assert len(entries) == len(manifest['files']), 'Duplicate manifest path'
    actual = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*')
              if p.is_file() and not ({'.git', '__pycache__', 'node_modules'} & set(p.parts))
              and p.relative_to(ROOT).parts[0] not in {'.paper-build', '.pnpm-store', '.pnpm-cache', '.browsers', '.public-export'}}
    assert actual == set(entries) | {'PUBLICATION_MANIFEST.json'}, 'File inventory differs from the public manifest'
    forbidden_extensions = {'.pdf', '.epub', '.djvu', '.mobi', '.mp3', '.mp4', '.wav',
        '.png', '.jpg', '.jpeg', '.webp', '.zip', '.7z', '.sqlite', '.db', '.pem', '.key'}
    forbidden_parts = {'downloaded papers', 'tmp', 'cache', 'screenshots', 'source_text',
        'source_texts', 'extracted_text', 'downloads', 'input_snapshots', 'versions', '.env'}
    private_path = re.compile(r'[A-Za-z]:[\\/]+Users[\\/]+|(?:file|sandbox)://', re.I)
    secret = re.compile(r'(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,}|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----)')
    for rel, entry in entries.items():
        p = (ROOT/rel).resolve()
        assert p.is_relative_to(ROOT) and p.is_file(), f'Unsafe or missing: {rel}'
        body = p.read_bytes()
        assert hashlib.sha256(body).hexdigest() == entry['sha256'], f'Hash mismatch: {rel}'
        assert len(body) == entry['bytes'], f'Size mismatch: {rel}'
        assert p.suffix.lower() not in forbidden_extensions, f'Source binary or secret file: {rel}'
        assert not (set(Path(rel).parts) & forbidden_parts), f'Private category: {rel}'
        text = body.decode('utf-8')
        # Code legitimately contains the detection patterns themselves.
        if p.suffix != '.py':
            assert not private_path.search(text), f'Local path remaining: {rel}'
            assert not secret.search(text), f'Credential-like content: {rel}'
        if p.suffix == '.json': json.loads(text)

    sets = {}
    data = {}
    for name, field in [('sources','source_id'),('claims','claim_id'),('cases','case_id'),('arguments','argument_id')]:
        rows = read(f'records/{name}.json')
        ids = {r[field] for r in rows}
        assert len(ids) == len(rows), f'Duplicate {field}'
        sets[name], data[name] = ids, rows
    for name in data:
        for row in data[name]:
            for key, target in [('source_ids','sources'), ('claim_ids','claims'), ('case_ids','cases'),
                                ('supporting_claim_ids','claims'),('conflicting_claim_ids','claims'),
                                ('dependency_argument_ids','arguments')]:
                assert set(row.get(key, [])) <= sets[target], f'Unresolved {key}: {row.get("claim_id", row.get("argument_id", name))}'
    tasks = read('state/tasks.json')
    by_id = {t['id']: t for t in tasks}
    assert len(by_id) == len(tasks), 'Duplicate task ID'
    done, visiting = set(), set()
    def visit(id):
        assert id in by_id, f'Missing dependency: {id}'
        if id in done: return
        assert id not in visiting, f'Dependency cycle: {id}'
        visiting.add(id)
        for dep in by_id[id]['dependencies']: visit(dep)
        visiting.remove(id)
        done.add(id)
    for id in by_id: visit(id)
    status = read('state/public_status.json')
    p2 = [t for t in tasks if t['id'].startswith('P2')]
    assert len(p2) == status['phase2_total_tasks']
    assert sum(t['status'] == 'accepted' for t in p2) == status['phase2_accepted_tasks']
    assert status['current_reviewed_release'] == 'retired'
    assert status['phase2_completed'] is False
    assert by_id['P2S02']['status'] == 'submitted'
    assert status['current_public_draft']['stage'] == 'draft'
    assert status['current_public_draft']['scientific_acceptance'] is False
    assert status['current_public_draft']['pending_reviews'] == ['P2R20', 'P2G2']
    assert by_id['P2S03']['status'] == 'blocked'
    # Phase 3 thesis programme: structure and crosswalk integrity (build-time Node
    # validation in scripts/thesis/build.cjs is stricter; this is the stdlib check).
    thesis = read('thesis/thesis.json')
    para_ids = set()
    parts = []
    for item in thesis['chapters'] + thesis['appendices']:
        chapter = ROOT / 'thesis' / item['file']
        assert chapter.is_file(), f'Missing thesis part: {item["file"]}'
        name = Path(item['file']).name
        prefix = 'c' + name[:2] if item['file'].startswith('chapters/') else 'ap' + name[0]
        text = chapter.read_text(encoding='utf-8')
        assert re.match(r'^---\r?\n', text), f'Thesis part lacks front matter: {item["file"]}'
        part_status = re.search(r'^status:\s*(\S+)$', text, re.M)
        assert part_status and part_status.group(1) in {'skeleton', 'drafted', 'submitted', 'accepted'}, \
            f'Invalid thesis part status: {item["file"]}'
        own = set()
        for pid in re.findall(r'<!--\s*id:\s*(\S+)\s*-->', text):
            assert re.match(r'^(c\d{2}|ap[A-Z])-p\d{3}$', pid), f'Bad paragraph id {pid} in {item["file"]}'
            assert pid.startswith(prefix + '-'), f'Paragraph id {pid} has the wrong prefix in {item["file"]}'
            assert pid not in para_ids, f'Duplicate thesis paragraph id: {pid}'
            para_ids.add(pid)
            own.add(pid)
        parts.append((prefix, part_status.group(1), own))
    record_ids = sets['sources'] | sets['claims'] | sets['cases'] | sets['arguments']
    # One crosswalk file per thesis part in thesis/crosswalk/; no strays, no misses.
    assert {f.name for f in (ROOT / 'thesis' / 'crosswalk').iterdir()} == \
        {f'{prefix}.json' for prefix, _, _ in parts}, 'thesis/crosswalk/ must hold exactly one file per part'
    for prefix, part_status, own in parts:
        crosswalk = read(f'thesis/crosswalk/{prefix}.json')
        assert crosswalk['thesis_version'] == thesis['version'], f'Crosswalk version mismatch: {prefix}'
        assert crosswalk['part'] == prefix, f'Crosswalk part mismatch: {prefix}'
        seen_cw = set()
        for entry in crosswalk['entries']:
            assert entry['paragraph_id'] in own, f'Crosswalk names missing or foreign paragraph: {entry["paragraph_id"]}'
            assert entry['paragraph_id'] not in seen_cw, f'Duplicate crosswalk entry: {entry["paragraph_id"]}'
            seen_cw.add(entry['paragraph_id'])
            assert entry['refs'], f'Empty crosswalk refs: {entry["paragraph_id"]}'
            for ref in entry['refs']:
                assert ref.startswith('PREMISE:') or ref in record_ids, f'Unresolved crosswalk ref: {ref}'
        if part_status != 'skeleton':
            assert own <= seen_cw, f'Unmapped paragraphs in non-skeleton part {prefix}'
    p3 = [t for t in tasks if t['id'].startswith('P3')]
    assert all(t['status'] in {'planned', 'ready', 'in_progress', 'submitted', 'reviewing',
                               'revision_needed', 'accepted', 'blocked'} for t in p3), 'Invalid P3 task status'
    # Status prose is commentary; state/*.json and front matter are the single source.
    assert status['phase3']['total_tasks'] == len(p3), 'phase3.total_tasks differs from state/tasks.json'
    assert status['phase3']['accepted_tasks'] == sum(t['status'] == 'accepted' for t in p3)
    drafted = sum(1 for prefix, part_status, _ in parts
                  if prefix.startswith('c') and prefix != 'c00' and part_status != 'skeleton')
    assert status['phase3']['chapters_drafted'] == drafted, 'chapters_drafted differs from thesis front matter'
    status_md = (ROOT / 'STATUS.md').read_text(encoding='utf-8')
    assert f"{status['phase2_accepted_tasks']} of {status['phase2_total_tasks']} assignments accepted" in status_md, \
        'STATUS.md acceptance count differs from state/tasks.json'
    draft_version = status['current_public_draft']['version']
    assert f'(version {draft_version})' in status_md, 'STATUS.md names a different draft version'
    paper_meta = re.search(r'<meta name="paper-version" content="([^"]+)"',
                           (ROOT / 'paper' / 'paper.html').read_text(encoding='utf-8'))
    assert paper_meta and paper_meta.group(1) == draft_version, 'paper.html version differs from public status'
    # Historical reports intentionally retain links to omitted audit/source files.
    # New public entry points must link to material present in this snapshot.
    for rel in ['README.md','CURRENT_RELEASE.md','START_HERE.md','REPORTS.md','records/README.md']:
        text = (ROOT/rel).read_text(encoding='utf-8')
        for target in re.findall(r'\]\(([^)]+)\)', text):
            if re.match(r'^[a-z][a-z0-9+.-]*:', target, re.I) or target.startswith('#'): continue
            target = unquote(target.split('#')[0])
            p = (ROOT/rel).parent / target
            assert p.exists(), f'Broken entry-point link: {rel} -> {target}'
    print(f'Validated {len(actual)} public files, {len(tasks)} tasks, '
          f'{len(sets["sources"])} sources, {len(sets["claims"])} claims, '
          f'{len(sets["arguments"])} arguments and {len(sets["cases"])} cases.')
    print('Working draft in paper/ is the public manuscript; former Version 1 files are retired.')
    print('This is a structural and publication-boundary check, not scientific verification.')

if __name__ == '__main__':
    validate()
