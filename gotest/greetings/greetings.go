package greetings

import (
	"errors"
	"fmt"
	"math/rand"
)

type Greeting struct {
	Greeting   string
	Salutation string
}

// Hello returns greeting
func Hello(name string, greeting Greeting) (string, error) {
	if name == "" {
		return "", errors.New("empty name")
	}
	message := fmt.Sprintf(randomFormat(greeting), name)
	return message, nil
}

func Hellos(names []string, greeting Greeting) (map[string]string, error) {
	defer fmt.Println("Hellos got called")
	messages := make(map[string]string)
	for _, name := range names {
		message, err := Hello(name, greeting)
		if err != nil {
			return nil, err
		}
		defer fmt.Println(message)
		messages[name] = message
	}
	return messages, nil
}

// private function because small letter
func randomFormat(greeting Greeting) string {
	formats := []string{
		"%s, %s %%v, wie gehts?",
		"%s! Cool dich zu treffen %s %%v",
		"%s %s %%v, du bist der Beste!",
	}

	format := formats[rand.Intn(len(formats))]
	return fmt.Sprintf(format, greeting.Greeting, greeting.Salutation)
}
