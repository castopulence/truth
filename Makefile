.PHONY: all build clean rebuild verify
ALL = TRUTH.html.asc
REMOVE = rm -fR
SIGNATURE = TRUTH.html.asc

all: build verify

build: $(SIGNATURE)

clean:
	$(REMOVE) $(ALL)

rebuild: clean all

verify:
	gpg --verify $(SIGNATURE)

%.asc: %
	gpg --detach-sign --armor $<
