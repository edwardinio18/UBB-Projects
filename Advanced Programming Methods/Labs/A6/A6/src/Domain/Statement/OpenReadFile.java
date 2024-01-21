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
import java.io.FileNotFoundException;
import java.io.FileReader;

public class OpenReadFile implements IStmt {
	private final IExpression expression;

	public OpenReadFile(IExpression expression) {
		this.expression = expression;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException, ExpressionException, ADTException {
		IValue value = expression.eval(state.getSymTable(), state.getHeap());
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
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		if (expression.typeCheck(typeEnv).equals(new StringType()))
			return typeEnv;
		else
			throw new StatementException("OpenReadFile requires a string expression.");
	}

	@Override
	public IStmt deepCopy() {
		return new OpenReadFile(expression.deepCopy());
	}

	@Override
	public String toString() {
		return String.format("OpenReadFile(%s)", expression.toString());
	}
}