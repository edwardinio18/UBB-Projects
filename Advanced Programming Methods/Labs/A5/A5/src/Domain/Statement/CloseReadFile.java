package Domain.Statement;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Statement.IStmt;
import Domain.Type.StringType;
import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Domain.Value.StringValue;

import java.io.BufferedReader;
import java.io.IOException;

// Class that represents the statement that closes a file
public class CloseReadFile implements IStmt {
	private final IExpression expression;

	public CloseReadFile(IExpression expression) {
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue value = expression.eval(state.getSymTable(), state.getHeap());

		if (!value.getType().equals(new StringType()))
			throw new StatementException(String.format("%s does not evaluate to StringValue", expression));

		StringValue fileName = (StringValue) value;
		IDictionary<String, BufferedReader> fileTable = state.getFileTable();

		if (!fileTable.containsKey(fileName.getValue()))
			throw new StatementException(String.format("%s is not present in the FileTable", value));

		BufferedReader br = fileTable.lookUp(fileName.getValue());

		try {
			br.close();
		} catch (IOException e) {
			throw new StatementException(String.format("Unexpected error in closing %s", value));
		}

		fileTable.remove(fileName.getValue());
		state.setFileTable(fileTable);

		return null;
	}

	@Override
	public String toString() {
		return String.format("CloseReadFile(%s)", expression.toString());
	}
}