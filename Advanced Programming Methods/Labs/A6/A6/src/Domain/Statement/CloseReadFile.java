package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.StringType;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Value.StringValue;
import Domain.Value.IValue;

import java.io.BufferedReader;
import java.io.IOException;

public class CloseReadFile implements IStatement {
	private final IExpression expression;

	public CloseReadFile(IExpression expression) {
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue value = expression.eval(state.getSymTable(), state.getHeap());
		if (value.getType().equals(new StringType())) {
			StringValue fileName = (StringValue) value;
			IDictionary<String, BufferedReader> fileTable = state.getFileTable();
			if (fileTable.isDefined(fileName.getValue())) {
				BufferedReader br = fileTable.lookUp(fileName.getValue());
				try {
					br.close();
				} catch (IOException e) {
					throw new StatementException(String.format("Unexpected error in closing %s", value));
				}
				fileTable.remove(fileName.getValue());
				state.setFileTable(fileTable);
			} else
				throw new StatementException(String.format("%s is not present in the FileTable", value));
		} else
			throw new StatementException(String.format("%s does not evaluate to StringValue", expression));
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		if (expression.typeCheck(typeEnv).equals(new StringType()))
			return typeEnv;
		else
			throw new StatementException("CloseReadFile requires a string expression.");
	}

	@Override
	public IStmt deepCopy() {
		return new CloseReadFile(expression.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("CloseReadFile(%s)", expression.toString());
	}
}