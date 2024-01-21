package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.Expression.IExpression;
import Domain.ProgramState.ProgramState;
import Domain.Type.IntType;
import Domain.Type.StringType;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Value.IntValue;
import Domain.Value.StringValue;
import Domain.Value.IValue;

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
				IValue fileNameValue = expression.eval(symTable, state.getHeap());
				if (fileNameValue.getType().equals(new StringType())) {
					StringValue castValue = (StringValue) fileNameValue;
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
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		if (expression.typeCheck(typeEnv).equals(new StringType()))
			if (typeEnv.lookUp(varName).equals(new IntType()))
				return typeEnv;
			else
				throw new StatementException("ReadFile requires an int as its variable parameter.");
		else
			throw new StatementException("ReadFile requires a string as es expression parameter.");
	}

	@Override
	public IStmt deepCopy() {
		return new ReadFile(expression.deepCopy(), varName);
	}

	@Override
	public String toString() {
		return String.format("ReadFile(%s, %s)", expression.toString(), varName);
	}
}