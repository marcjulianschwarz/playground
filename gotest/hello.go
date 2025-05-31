package main

import (
	"fmt"
	"log"

	"example.com/greetings"
)

type Vertex struct {
	Lat, Long float64
}

// you usually wouldd want to use a pointer receiver here to be able to change the receiver
func (v *Vertex) add() float64 {
	v.Lat = 10
	return v.Lat + v.Long
}

var m map[string]Vertex
var m2 = map[string]Vertex{
	"Bell Labs": {
		40.68433, -74.39967,
	},
	"Google": {
		37.42202, -122.08408,
	},
}

func main() {

	m = make(map[string]Vertex)
	m["MJ"] = Vertex{49.2, 11.1}
	m["CC"] = Vertex{20, 20}

	elem, ok := m["CC"]
	if ok {
		fmt.Println(elem)
		fmt.Println(elem, elem.add()) // the arguments are run first, then printed
		delete(m, "CC")
	}
	fmt.Println(m)

	fmt.Println(m["MJ"])
	fmt.Println(m2["Google"])

	log.SetPrefix("greetings: ")
	log.SetFlags(0)

	names := []string{"MJ", "Memjay", "Max", "Jo"}
	grM := greetings.Greeting{Salutation: "Herr", Greeting: "Moin"}
	grF := greetings.Greeting{Salutation: "Frau", Greeting: "Hey"}
	grF2 := greetings.Greeting{Salutation: "Frau", Greeting: "Moin"}

	// setting explicit array size and type
	var myGreetings [3]greetings.Greeting
	myGreetings[0] = grM
	myGreetings[1] = grF
	myGreetings[2] = grF2

	var dynamicSlice []string
	dynamicSlice = append(dynamicSlice, "a", "b", "c", "d") // dynamically increased capacity of underlying array
	fmt.Println(dynamicSlice, cap(dynamicSlice))

	for i, v := range dynamicSlice {
		fmt.Println(i, ":", v, "is a copy")
	}

	// this slice does not store any data, editing it will edit the myGreetings Array
	// slices are like references to arrays
	var myGreetingsSlice []greetings.Greeting = myGreetings[0:2]
	var myGreetingsSliceFull []greetings.Greeting = myGreetings[:]

	fmt.Println("Length T Slice", len(myGreetingsSlice))
	fmt.Println("Capacity T Slice", cap(myGreetingsSlice)) // capacity is size of underlying array

	fmt.Println("Length Full Slice", len(myGreetingsSliceFull))
	fmt.Println("Capacity Full Slice", cap(myGreetingsSliceFull))

	// Resclice first slice
	myGreetingsSlice = myGreetingsSlice[:cap(myGreetingsSlice)] // in this case reslice to full size
	fmt.Println("Length T Resliced", len(myGreetingsSlice))

	// Make a bigger slice
	a := make([]int, 5)    // integer slice with length of 5 and capacity of 5
	b := make([]int, 3, 5) // integer slice with length of 3 and capacity of 5
	fmt.Println(a)
	fmt.Println("Length a Slice", len(a))
	fmt.Println("Capacity a Slice", cap(a))

	fmt.Println(b)
	fmt.Println("Length b Slice", len(b))
	fmt.Println("Capacity b Slice", cap(b))

	// Get a greeting messages and print it.
	messages, err := greetings.Hellos(names, myGreetingsSliceFull[1])
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(messages)
}

// interface{}  ==> basically the unknown or any type in TS