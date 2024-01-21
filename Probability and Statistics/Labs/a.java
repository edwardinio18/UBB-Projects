import java.io.Console;

public static class A {
    public static Counter = 1;
}

public class B {
    public B() {
        A.Counter++;
    }
}

public class C : B {
    public C(): base() {
        A.Counter++;
    }
}

var x = new C();
COnsole.WriteLine(A.Counter);

for (int i = 0; i <= n; i++) {
    i *= 2;
}

class Rebel {
    String name;
    String technologyStack;

    Rebel(String name, String technologyStack) {
        this.name = name;
        this.technologyStack = technologyStack;
    }
}

Rebel firstRebel = new Rebel("FirstRebel", "React");
Rebel secondRebel = new Rebel("React", ".NET");

if (firstRebel.technologyStack.Equals(secondRebel.name)) {
    Console.WriteLine("Sunt egale");
} else {
    Console.WriteLine("Nu sunt egale");
}

interface Animal {
    speak();
}

class Dog implements Animal {
    private name: string;
    private owner: Person;

    speak() {
        print "Woof!";
    }
}

class Cat implements Animal {
    private name: string;
    private owner: Person;

    speak() {
        print "Miau!";
    }
}

In an apartment complex there are buildings with different floor numbers. You are given an array with the number of floors in each building. Determine how many buildings are the tallest ones.