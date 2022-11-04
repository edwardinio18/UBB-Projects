package Domain.Statement;

import Domain.ProgramState.ProgramState;

public class NopStmt implements IStmt {

	@Override
	public ProgramState execute(ProgramState state) {
		return null;
	}

	@Override
	public IStmt deepCopy() {
		return new NopStmt();
	}

	@Override
	public String toString() {
		return "NopStatement";
	}
}