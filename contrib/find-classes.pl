use v5.032;

use Text::Balanced qw(extract_quotelike extract_multiple);

our %classes;

while (my $line = <STDIN>) {
  chomp($line);

  my @values = extract_multiple($line, [
    \&extract_quotelike,
    qr/class=/,
    ]);

  for my $value (map split(/ /), @values) {
    $classes{$value} = 1;
  }
}

say for sort { $a cmp $b } keys %classes;
