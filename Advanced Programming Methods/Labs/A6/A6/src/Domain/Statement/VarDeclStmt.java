package Domain.Statement;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Value.IValue;

public class VarDeclStmt implements IStmt {
	String name;
	IType type;

	public VarDeclStmt(String name, IType type) {
		this.name = name;
		this.type = type;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException {
		IDictionary<String, IValue> symTable = state.getSymTable();
		if (symTable.isDefined(name)) {
			throw new StatementException("Variable " + name + " already exists in the symTable.");
		}
		symTable.put(name, type.defaultValue());
		state.setSymTable(symTable);
		return null;
	}

	@Override
	public IDictionary<String, IType> typeCheck(IDictionary<String, IType> typeEnv) throws StatementException, ExpressionException, ADTException {
		typeEnv.put(name, type);
		return typeEnv;
	}

	@Override
	public IStmt deepCopy() {
		return new VarDeclStmt(name, type);
	}

	@Override
	public String toString() {
		return String.format("%s %s", type.toString(), name);
	}
}