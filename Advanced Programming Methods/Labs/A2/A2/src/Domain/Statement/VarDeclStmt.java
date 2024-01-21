package Domain.Statement;

import Domain.ProgramState.ProgramState;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Exceptions.StatementException;

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

		if (symTable.isDefined(this.name)) {
			throw new StatementException("Variable " + this.name + " already exists");
		}

		symTable.put(this.name, this.type.defaultValue());
		state.setSymTbl(symTable);

		return state;
	}

	@Override
	public IStmt deepCopy() {
		return new VarDeclStmt(this.name, this.type);
	}

	@Override
	public String toString() {
		return String.format("%s %s", this.type.toString(), this.name);
	}
}