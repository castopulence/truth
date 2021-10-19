use v5.032;

use Text::Balanced qw/extract_delimited/;

our %classes;

while (my $line = <STDIN>) {
  chomp($line);

  my @values = extract_delimited($line, "\"'", qr/.*\bclass=/);

  for my $value (map split(/ /), @values) {
    $classes{$value} = 1;
  }
}

say for sort { $a cmp $b } keys %classes;
