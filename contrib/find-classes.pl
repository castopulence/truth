use v5.032;

use Text::Balanced qw(extract_delimited extract_multiple);

our %classes;

while (my $line = <STDIN>) {
  chomp($line);

  my @extractors = ( \&extract_classes );
  my @values = extract_multiple($line, \@extractors);

  for my $value (map split(/ /), @values) {
    $classes{$value} = 1;
  }
}

say for sort { $a cmp $b } keys %classes;

sub extract_classes {
  extract_delimited($_[0], q('"), 'class=');
}
