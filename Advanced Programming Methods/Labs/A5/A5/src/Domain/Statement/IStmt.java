package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;

import Domain.ProgramState.ProgramState;

// Interface for all statements (statements are the basic building blocks of the program)
public interface IStmt {
	ProgramState execute(ProgramState state) throws ADTException, ExpressionException, StatementException;
}