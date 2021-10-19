use v5.032;

our %classes;

while (my $line = <STDIN>) {
    chomp($line);

    my @values = $line =~ m{ class="([^"]*)" }gx;

    for my $value (map split(/ /), @values) {
        say $value;

        $classes{$value} = 1;
    }
}

say for sort { $a cmp $b } keys %classes;
