package Domain.Statement;

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
		return state;
	}

	@Override
	public String toString() {
		return String.format("%s %s", type.toString(), name);
	}
}