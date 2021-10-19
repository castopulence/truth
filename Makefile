.PHONY: all build classes clean commit push rebuild signatures verify
CLASSES = TRUTH.html.classes
REMOVE = rm -fR
SIGNATURES = CONTRIBUTING.asc Makefile.asc README.md.asc TRUTH.html.asc truth.js.asc contrib/find-classes.pl.asc contrib/add-dashes-to-classes.bash.asc
ALL = $(CLASSES) $(SIGNATURES)

all: build verify commit push

build: classes signatures

classes: $(CLASSES)

clean:
	$(REMOVE) $(ALL)

commit:
	-git commit -aev

push:
	-git push

rebuild: clean all

signatures: $(SIGNATURES)

verify:
	for f in $(SIGNATURES); do gpg --verify $$f; done;

%.asc: %
	gpg --detach-sign --armor $<

%.classes: %
	perl contrib/find-classes.pl < $< >> $<.classes
