package Domain.Statement;

import Domain.ProgramState.ProgramState;

// Class that represents a statement that does nothing
public class NopStmt implements IStmt {
	@Override
	public String toString() {
		return "NopStatement";
	}

	@Override
	public ProgramState execute(ProgramState state) {
		return null;
	}
}