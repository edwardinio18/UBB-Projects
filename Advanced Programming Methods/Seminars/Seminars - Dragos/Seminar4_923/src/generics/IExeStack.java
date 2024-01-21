package generics;

import java.util.ArrayList;
import java.util.List;

// assignment example
interface IStmt {
    void execute();
}

class CompStmt implements IStmt {

    @Override
    public void execute() {
        System.out.println("execute CompStmt");
    }

    @Override
    public String toString() {
        return "CompStmt";
    }
}

class EmptyStackException extends Exception {
    public EmptyStackException(String message) {
        super(message);
    }
}

public interface IExeStack<T extends IStmt> {
    void push(T elem);
    T pop() throws EmptyStackException;
}

class ExeStack<T extends IStmt> implements IExeStack<T> {

    /**
     * ArrayDeque
     */
    List<T> stackOfStatements;
    public ExeStack() {
        stackOfStatements = new ArrayList<>();
    }

    @Override
    public void push(T elem) {
        stackOfStatements.add(elem);
    }

    @Override
    public T pop() throws EmptyStackException {
        if(stackOfStatements.isEmpty()){
            throw new EmptyStackException("empty stack");
        } 
        int lastIndex = stackOfStatements.size() - 1;
        T element = stackOfStatements.get(lastIndex);
        stackOfStatements.remove(lastIndex);
        return element;
    }
    
    public static void main(String[] args) throws EmptyStackException {
        IExeStack<IStmt> statementsExeStack = new ExeStack<>();

        statementsExeStack.push(new CompStmt());
        // so far so good
        System.out.println(statementsExeStack.pop());
        // uh-oh
        System.out.println(statementsExeStack.pop());
    }
}
