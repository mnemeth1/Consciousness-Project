"""Standalone publication boundary check. Never accepts arbitrary/source-library PDFs."""
from pathlib import Path
import hashlib
import json
import re
import sys

def validate(directory):
    root = Path(directory)
    assert root.is_dir() and not root.is_symlink(), 'Expected an artifact directory'
    assert {p.name for p in root.iterdir()} == {'index.html', 'paper.pdf', 'release.json'}, 'Publish exactly the generated pair and manifest'
    for p in root.iterdir():
        assert p.is_file() and not p.is_symlink(), 'Only regular generated files'
    manifest = json.loads((root/'release.json').read_text(encoding='utf-8'))
    assert manifest['schema'] == 1 and manifest['mode'] in {'release','draft-release'} and manifest['fixture'] is False, 'No ordinary preview/fixture publication'
    assert re.fullmatch(r'(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)', manifest['version'])
    assert re.fullmatch(r'[a-f0-9]{40}', manifest['source_commit'])
    assert re.fullmatch(r'[a-f0-9]{64}', manifest['renderer_sha256'])
    if manifest['mode']=='release':
        assert re.fullmatch(r'[a-f0-9]{64}', manifest['review_sha256']) and manifest['review']['gate_id'] == 'P2G2'
        assert not manifest.get('draft_authorization_sha256'), 'No mixed draft/reviewed provenance'
    else:
        assert re.fullmatch(r'[a-f0-9]{64}', manifest['draft_authorization_sha256'])
        assert manifest['stage']=='draft' and manifest['scientific_acceptance'] is False
        assert manifest['draft']['status']=='authorized-draft' and manifest['draft']['pending_reviews']==['P2R20','P2G2']
        assert manifest['review_sha256'] is None and manifest['review'] is None
        presentation=manifest.get('presentation')
        assert presentation in {None,'research-article'}, 'Unsupported paper presentation'
        assert presentation==manifest['draft'].get('presentation'), 'Draft presentation authorization mismatch'
        if presentation=='research-article':
            assert manifest['title'].strip() and not re.search(r'P2R20|P2G2|Phase\s*2\s*working\s*draft',manifest['title'],re.I), 'Ordinary scholarly title required'
        else:
            assert re.match(r'^Phase 2 working draft(?:[: -]|$)',manifest['title'])
    for file, field in [('index.html', 'html_sha256'), ('paper.pdf', 'pdf_sha256')]:
        assert hashlib.sha256((root/file).read_bytes()).hexdigest() == manifest[field], 'Stale or changed pair: ' + file
    assert (root/'paper.pdf').read_bytes().startswith(b'%PDF-'), 'Generated paper PDF required'
    print('Validated the sole permitted generated publication PDF and exact HTML pair. Scientific review is a separate gate.')
    return manifest

if __name__ == '__main__':
    assert len(sys.argv) == 2, 'Usage: python scripts/validate_paper_artifact.py artifact-directory'
    validate(sys.argv[1])
