package generics;

// generic interface
interface GenericInterface<T> {
    void method(T t);
    <U> U genericMethod(U u);
}

// still a generic type, you can instantiate GenericImplementation<Integer/String...> anything
class GenericImplementation<T> implements GenericInterface<T> {

    @Override
    public void method(T t) {

    }

    @Override
    public <U> U genericMethod(U u) {
        return null;
    }

    public static void main(String[] args) {
        new GenericImplementation<Integer>().method(4);
        new GenericImplementation<String>().method("four");

        // also the generic method may be called with any arguments, independent of the type used for GenericImplementation
        new GenericImplementation<Integer>().genericMethod("You can have anything here, the method is generic");

        // I am not forced to specify the type that I am passing to the generic function, as this can be inferred, but you can also do it like this
        new GenericImplementation<String>().<Exception>genericMethod(new Exception());
    }
}

// and this is how you do an implementation for a specific type... my bad
// if you are to write GenericImpl<Exception> implements GenericInterface<Exception> as I tried
// it will consider the literal "Exception" as a generic type, not as the java.lang.Exception
class ExceptionGenericImplementation implements GenericInterface<Exception> {

    @Override
    public void method(Exception exception) {
    }

    @Override
    public <U> U genericMethod(U u) {
        return u;
    }

}

