.PHONY: all build classes clean commit push rebuild signatures verify
CLASSES = classes/TRUTH.html.classes
REMOVE = rm -fR
SIGNATURES = signatures/CONTRIBUTING.asc signatures/Makefile.asc signatures/README.md.asc signatures/TRUTH.html.asc signatures/truth.css.asc signatures/truth.js.asc signatures/find-classes.pl.asc signatures/add-dashes-to-classes.bash.asc
ALL = $(CLASSES) $(SIGNATURES)

all: build verify commit push

build: classes signatures

classes: $(CLASSES)

clean:
	$(REMOVE) $(ALL)

commit:
	-git commit -aev

mkdir:
	mkdir -p classes signatures

push:
	-git push

rebuild: clean all

signatures: $(SIGNATURES)

verify:
	gpg --verify signatures/CONTRIBUTING.asc CONTRIBUTING
	gpg --verify signatures/Makefile.asc Makefile
	gpg --verify signatures/README.md.asc README.md
	gpg --verify signatures/TRUTH.html.asc src/TRUTH.html
	gpg --verify signatures/truth.js.asc src/truth.js
	gpg --verify signatures/find-classes.pl.asc contrib/find-classes.pl
	gpg --verify signatures/add-dashes-to-classes.bash.asc contrib/add-dashes-to-classes.bash

%.asc: %
	gpg --detach-sign --armor $<

%.classes: %
	perl contrib/find-classes.pl < $< > $@

classes/TRUTH.html.classes: src/TRUTH.html
	perl contrib/find-classes.pl < $< > $@

signatures/CONTRIBUTING.asc: CONTRIBUTING
	gpg --detach-sign --armor $<
	mv -f $<.asc signatures/$<.asc

signatures/Makefile.asc: Makefile
	gpg --detach-sign --armor $<
	mv -f $<.asc signatures/$<.asc

signatures/README.md.asc: README.md
	gpg --detach-sign --armor $<
	mv -f $<.asc signatures/$<.asc

signatures/TRUTH.html.asc: src/TRUTH.html
	gpg --detach-sign --armor $<
	mv -f src/TRUTH.html.asc signatures/TRUTH.html.asc

signatures/add-dashes-to-classes.bash.asc: contrib/add-dashes-to-classes.bash
	gpg --detach-sign --armor $<
	mv -f contrib/add-dashes-to-classes.bash.asc signatures/add-dashes-to-classes.bash.asc

signatures/find-classes.pl.asc: contrib/find-classes.pl
	gpg --detach-sign --armor $<
	mv -f contrib/find-classes.pl.asc signatures/find-classes.pl.asc

signatures/truth.css.asc: src/truth.css
	gpg --detach-sign --armor $<
	mv -f src/truth.css.asc signatures/truth.css.asc

signatures/truth.js.asc: src/truth.js
	gpg --detach-sign --armor $<
	mv -f src/truth.js.asc signatures/truth.js.asc
