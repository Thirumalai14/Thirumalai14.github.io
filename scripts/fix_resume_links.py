"""
Rewrite mangled hyperlink targets inside the resume PDF.

Why: the source template for the PDF concatenated the protocol prefix and the
link label around the actual URL, producing entries like
    https://Linhttps://www.linkedin.com/in/thirumalai14/kedIn
that cause "site cannot be reached" errors when clicked.

We patch the URI entries (PDF /URI annotation actions) in-place so the
displayed text stays the same but clicks resolve to the correct destinations.
"""

import sys
from pathlib import Path
from typing import Optional

import pikepdf


PDF_PATH = Path(
    "/Users/tveerapa/Desktop/Draft/portfolio/assets/"
    "Thirumalai-V-DevOps-Resume.pdf"
)

# Allow-list of substring matches → clean destination URL.
# Order matters: more-specific patterns first.
URL_FIXES = [
    ("linkedin.com/in/thirumalai14",      "https://www.linkedin.com/in/thirumalai14/"),
    ("github.com/Thirumalai14",           "https://github.com/Thirumalai14"),
    ("thirumalai14.netlify.app",          "https://thirumalai14.github.io/"),
    ("thirumalai14.github.io",            "https://thirumalai14.github.io/"),
    ("mailto:thirumalai.v1423@gmail.com", "mailto:thirumalaiv0114@gmail.com"),
]


def pick_replacement(current_uri: str) -> Optional[str]:
    """Return the clean URL for a known-mangled URI, or None if untouched."""
    for needle, clean_url in URL_FIXES:
        if needle.lower() in current_uri.lower():
            return clean_url
    return None


def main() -> int:
    if not PDF_PATH.exists():
        print(f"ERROR: PDF not found at {PDF_PATH}", file=sys.stderr)
        return 1

    rewrites = []
    with pikepdf.open(str(PDF_PATH), allow_overwriting_input=True) as pdf:
        for page_index, page in enumerate(pdf.pages):
            annots = page.get("/Annots")
            if annots is None:
                continue
            for annot in annots:
                action = annot.get("/A")
                if action is None:
                    continue
                uri = action.get("/URI")
                if uri is None:
                    continue
                current = str(uri)
                replacement = pick_replacement(current)
                if replacement is None:
                    print(f"  page {page_index + 1}: left untouched -> {current}")
                    continue
                if current == replacement:
                    print(f"  page {page_index + 1}: already clean -> {current}")
                    continue
                action["/URI"] = pikepdf.String(replacement)
                rewrites.append((page_index + 1, current, replacement))

        if not rewrites:
            print("No mangled URIs found. Nothing to save.")
            return 0

        pdf.save(str(PDF_PATH))

    print("\nRewrote the following URIs:")
    for page_no, old, new in rewrites:
        print(f"  page {page_no}:")
        print(f"    before: {old}")
        print(f"    after:  {new}")
    print(f"\nSaved patched PDF in place at:\n  {PDF_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
