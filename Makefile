.PHONY: all build clean commit push rebuild verify
REMOVE = rm -fR
SIGNATURE = TRUTH.html.asc
ALL = $(SIGNATURE)

all: build verify commit push

build: $(SIGNATURE)

clean:
	$(REMOVE) $(ALL)

commit:
	-git commit -aev

push:
	-git push

rebuild: clean all

verify:
	gpg --verify $(SIGNATURE)

%.asc: %
	gpg --detach-sign --armor $<
