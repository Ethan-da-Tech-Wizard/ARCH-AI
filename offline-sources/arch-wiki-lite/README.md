# Offline ArchWiki Source

This directory contains an official `arch-wiki-lite` package downloaded from the Arch package download endpoint and extracted locally for source review.

It is source material for maintainers of this walkthrough. It is not bundled into `arch-setup-walkthrough.html`.

## Package

- Package: `arch-wiki-lite`
- Version: `20260702-1`
- Official package page: `https://archlinux.org/packages/extra/any/arch-wiki-lite/`
- Official download endpoint used: `https://archlinux.org/packages/extra/any/arch-wiki-lite/download/`
- Package file: `arch-wiki-lite-20260702-1-any.pkg.tar.zst`
- SHA-256: `0270a3b0645e91e1684ab1255fd8346e3ec388dce82da24d53a1ac04b0021cf5`
- Extracted root: `root/`
- Searchable text archive: `root/usr/share/doc/arch-wiki/text/arch-wiki.txt.gz`
- Article index: `root/usr/share/doc/arch-wiki/text/index`

## Search

Search the offline wiki text with:

```sh
zgrep -n "Installation guide" offline-sources/arch-wiki-lite/root/usr/share/doc/arch-wiki/text/arch-wiki.txt.gz
```

Search the article index with:

```sh
rg "en/Installation_guide" offline-sources/arch-wiki-lite/root/usr/share/doc/arch-wiki/text/index
```

The app still links to live official sources. This offline archive is for review when internet access is unavailable or when a command needs to be traced back to the ArchWiki text.
