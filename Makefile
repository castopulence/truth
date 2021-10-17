.PHONY: all build clean commit push rebuild verify
REMOVE = rm -fR
SIGNATURES = CONTRIBUTING.asc Makefile.asc README.md.asc TRUTH.html.asc truth.js.asc
ALL = $(SIGNATURES)

all: build verify commit push

build: $(SIGNATURES)

clean:
	$(REMOVE) $(ALL)

commit:
	-git commit -aev

push:
	-git push

rebuild: clean all

verify:
	for f in $(SIGNATURES); do gpg --verify $$f; done;

%.asc: %
	gpg --detach-sign --armor $<
