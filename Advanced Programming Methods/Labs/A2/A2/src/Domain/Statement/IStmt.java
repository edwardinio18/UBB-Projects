package Domain.Statement;

import Domain.ProgramState.ProgramState;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;

public interface IStmt {
	ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException;
	IStmt deepCopy();
}