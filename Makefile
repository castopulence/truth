.PHONY: all build clean commit push rebuild verify
ALL = TRUTH.html.asc
REMOVE = rm -fR
SIGNATURE = TRUTH.html.asc

all: build verify commit push

build: $(SIGNATURE)

clean:
	$(REMOVE) $(ALL)

commit:
	git commit -aev

push:
	git push

rebuild: clean all

verify:
	gpg --verify $(SIGNATURE)

%.asc: %
	gpg --detach-sign --armor $<
