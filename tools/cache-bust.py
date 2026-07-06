#!/usr/bin/env python3
"""docs/ 内のHTMLが参照するローカルCSS/JSに ?v=<コンテンツハッシュ> を付与する。

GitHub Pages はレスポンスに Cache-Control: max-age=600 を固定で返すため、
アセットURLを変えない限りブラウザ/CDNが古いファイルを掴み続ける。
参照先ファイルの内容ハッシュをクエリに埋め込むことで、
「中身が変わったURLだけ」が変化し、キャッシュを確実に無効化する。

使い方:
    python3 tools/cache-bust.py          # スタンプ実行（変更があればHTMLを書き換え）
    python3 tools/cache-bust.py --check   # 差分が出るかだけ確認（CI用・書き換えなし）

対象: docs/**/*.html の href/src で参照される .css / .js（外部URLは対象外）
"""
import hashlib
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"

# href="..." / src="..." で終端が .css/.js（既存の ?v=... は許容）のものを拾う
ATTR_RE = re.compile(
    r'(?P<attr>href|src)="(?P<path>(?!https?:|//)[^"?]+\.(?:css|js))(?:\?v=[0-9a-f]+)?"'
)


def short_hash(file: Path) -> str:
    return hashlib.md5(file.read_bytes()).hexdigest()[:8]


def process(html: Path, write: bool) -> bool:
    text = html.read_text(encoding="utf-8")
    changed = False

    def repl(m: re.Match) -> str:
        nonlocal changed
        ref = (html.parent / m.group("path")).resolve()
        if not ref.is_file():
            return m.group(0)  # 参照先が無ければそのまま
        stamped = f'{m.group("attr")}="{m.group("path")}?v={short_hash(ref)}"'
        if stamped != m.group(0):
            changed = True
        return stamped

    new_text = ATTR_RE.sub(repl, text)
    if changed and write:
        html.write_text(new_text, encoding="utf-8")
    return changed


def main() -> int:
    check_only = "--check" in sys.argv
    htmls = sorted(DOCS.rglob("*.html"))
    touched = [h for h in htmls if process(h, write=not check_only)]
    if check_only:
        if touched:
            print("cache-bust: 未スタンプの変更あり:")
            for h in touched:
                print("  -", h.relative_to(REPO))
            return 1
        print("cache-bust: 全て最新")
        return 0
    for h in touched:
        print("stamped:", h.relative_to(REPO))
    if not touched:
        print("cache-bust: 変更なし（全て最新）")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
