package Repository;

import Domain.ProgramState.ProgramState;
import Exceptions.ADTException;

import java.io.IOException;
import java.util.List;

public interface IRepository {
	List<ProgramState> getProgramStates();
	void setProgramStates(List<ProgramState> programStates);
	ProgramState getCurrentState();
	void addProgram(ProgramState program);
	void logPrgStaExe() throws ADTException, IOException;
}