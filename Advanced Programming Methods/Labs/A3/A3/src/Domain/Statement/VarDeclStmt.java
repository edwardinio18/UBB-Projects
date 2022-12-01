package Domain.Statement;

import Domain.Statement.IStmt;
import Exceptions.StatementException;

import Domain.ProgramState.ProgramState;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Domain.Type.IType;
import Exceptions.StatementException;

public class VarDeclStmt implements IStmt {
	String name;
	IType typ;

	public VarDeclStmt(String name, IType typ) {
		this.name = name;
		this.typ = typ;
	}

	@Override
	public ProgramState execute(ProgramState state) throws StatementException {
		IDictionary<String, IValue> symTable = state.getSymTable();

		if (symTable.isDefined(name))
			throw new StatementException("Variable " + name + " already declared!");

		symTable.put(name, typ.defaultValue());
		state.setSymTable(symTable);
		return state;
	}

	@Override
	public String toString() {
		return typ.toString() + " " + name;
	}
}