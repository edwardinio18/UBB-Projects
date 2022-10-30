package generics;

import java.io.IOException;
import java.util.*;

public interface WildcardInterface {
    void wildcard(List<?> list);
    void upperBoundWildcard(List<? extends Throwable> list);
    void lowerBoundWildcard(List<? super Throwable> list);
}

class WildcardImplementation implements WildcardInterface {

    @Override
    public void wildcard(List<?> list) {
        // you can only use Object for iterating through, or retrieving the elements,
        // as you do not know the type
        for (Object object : list) {
            System.out.println(object);
        }
    }

    @Override
    public void upperBoundWildcard(List<? extends Throwable> list) {
        // you can only use Throwable or other parents of this class for accessing the elements
        // as you know that all of them will extend the Throwable type
        for (Throwable extendsThrowable : list) {
            // for these cases you can use pattern matching if you want to do something specific with the throwables/objects
            // use instanceof operator
            if(extendsThrowable instanceof IOException) {
                // downcast to IOException
                IOException ioException = (IOException) extendsThrowable;
            } else {
                // ...
            }
        }
    }

    @Override
    public void lowerBoundWildcard(List<? super Throwable> list) {
        // not allowed to iterate or access elements as Throwable
        // e.g for(Throwable throwable : list) {}

        // use the highest parent there is, meaning Object
        for(Object superForThrowable : list) {
        }
    }

    public static void main(String[] args) {
        WildcardInterface wildcardInterface = new WildcardImplementation();

        // accepted
        wildcardInterface.upperBoundWildcard(new ArrayList<Error>());
        wildcardInterface.upperBoundWildcard(new ArrayList<IOException>());

        // accepted
        wildcardInterface.lowerBoundWildcard(new ArrayList<>());
        wildcardInterface.lowerBoundWildcard(new ArrayList<Object>());

        // you can have any type on the actual instance
        List<?> objectList = new ArrayList<Integer>(){{
            add(5);
            add(3);
        }};

        // you can have only those types that are children of Throwable
        List<? extends Throwable> throwableList = new ArrayList<Exception>() {{
            add(new Exception());
        }};
        // you are allowed to add null
        throwableList.add(null);
        // but other than that, the list is immutable, meaning that you cannot add anything to it
        // throwableList.add(new Exception()); NOT

        //
        List<? super IOException> ioexceptionList = new ArrayList<Exception>();
        // ioexceptionList.add(new Exception());
        // not allowed, as we may have a List<Exception> reference, and we want to add a Throwable instance, but!

        ioexceptionList.add(new IOException());
        // this is allowed, as whatever the type in that List reference, IOException is guaranteed to be an instance of that type

        // this is allowed
        List<? extends Exception> exceptions = new ArrayList<IOException>();

        // this is not
        // you are not allowed to use wildcard on the instance, the type needs to be known at compile-time
        // List<? extends Exception> exceptions = new ArrayList<? extends Exception>();

        // List, Set, Queue
        Collection<?> collection = new ArrayList<>();
        List<Integer> list = new ArrayList<>() {{
            add(5);
            add(1);
            add(4);
            add(7);
            add(8);
            add(3);
        }};
        // [5, 1, 4, 7, 8, 3]
        list.remove(2); // removes element with index 2
        for(Integer i : list) {
            System.out.println(i);
        }
        // [5, 1, 7, 8, 3]
        list.remove(Integer.valueOf(3)); // removes the Integer object
        for(Integer i : list) {
            System.out.println(i);
        }
        // [5, 1, 7, 8]
    }
}

