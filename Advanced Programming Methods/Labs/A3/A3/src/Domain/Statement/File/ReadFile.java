package Domain.Statement.File;

import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Exceptions.ADTException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Statement.IStmt;
import Domain.Type.IntType;
import Domain.Type.StringType;
import Domain.Utilities.IDictionary;
import Domain.Value.IntValue;
import Domain.Value.IValue;
import Domain.Value.StringValue;

import java.io.BufferedReader;
import java.io.IOException;

public class ReadFile implements IStmt {
	private final IExpression expression;
	private final String varName;

	public ReadFile(IExpression expression, String varName) {
		this.expression = expression;
		this.varName = varName;
	}
	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IDictionary<String, IValue> symTable = state.getSymTable();
		IDictionary<String, BufferedReader> fileTable = state.getFileTable();

		if (symTable.isDefined(varName)) {
			IValue value = symTable.lookUp(varName);

			if (value.getType().equals(new IntType())) {
				value = expression.eval(symTable);

				if (value.getType().equals(new StringType())) {
					StringValue castValue = (StringValue) value;

					if (fileTable.isDefined(castValue.getValue())) {
						BufferedReader br = fileTable.lookUp(castValue.getValue());

						try {
							String line = br.readLine();
							if (line == null)
								line = "0";
							symTable.put(varName, new IntValue(Integer.parseInt(line)));
						} catch (IOException e) {
							throw new StatementException(String.format("Could not read from file %s", castValue));
						}
					} else {
						throw new StatementException(String.format("The file table does not contain %s", castValue));
					}
				} else {
					throw new StatementException(String.format("%s does not evaluate to StringType", value));
				}
			} else {
				throw new StatementException(String.format("%s is not of type IntType", value));
			}
		} else {
			throw new StatementException(String.format("%s is not present in the symTable.", varName));
		}
		return state;
	}

	@Override
	public String toString() {
		return String.format("ReadFile(%s, %s)", expression.toString(), varName);
	}
}