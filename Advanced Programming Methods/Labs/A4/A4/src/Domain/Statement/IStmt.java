package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;

public interface IStmt {
	ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException;
}