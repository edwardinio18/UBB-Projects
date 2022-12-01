package Domain.Statement.File;

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
import java.io.FileNotFoundException;
import java.io.FileReader;

public class OpenReadFile implements IStmt {
	private final IExpression expression;

	public OpenReadFile(IExpression expression) {
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue value = this.expression.eval(state.getSymTable());

		if (value.getType().equals(new StringType())) {
			StringValue fileName = (StringValue) value;
			IDictionary<String, BufferedReader> fileTable = state.getFileTable();

			if (!fileTable.isDefined(fileName.getValue())) {
				BufferedReader br;

				try {
					br = new BufferedReader(new FileReader(fileName.getValue()));
				} catch (FileNotFoundException e) {
					throw new StatementException(String.format("%s could not be opened", fileName.getValue()));
				}

				fileTable.put(fileName.getValue(), br);
				state.setFileTable(fileTable);
			} else {
				throw new StatementException(String.format("%s is already opened", fileName.getValue()));
			}
		} else {
			throw new StatementException(String.format("%s does not evaluate to StringType", expression.toString()));
		}
		return state;
	}

	@Override
	public String toString() {
		return String.format("OpenReadFile(%s)", expression.toString());
	}
}