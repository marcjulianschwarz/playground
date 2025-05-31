package greetings

import (
	"regexp"
	"testing"
)

var greeting = Greeting{Salutation: "Herr", Greeting: "Moin"}

func TestHelloName(t *testing.T) {
	name := "MJ"
	want := regexp.MustCompile(`\b` + name + `\b`)
	msg, err := Hello("MJ", greeting)
	if !want.MatchString(msg) || err != nil {
		t.Errorf(`Hello("Gladys") = %q, %v, want match for %#q, nil`, msg, err, want)
	}
}

func TestHelloEmpty(t *testing.T) {
	msg, err := Hello("", greeting)
	if msg != "" || err == nil {
		t.Errorf(`Hello("") = %q, %v, want "", error`, msg, err)
	}
}
