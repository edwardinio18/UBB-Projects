package Controller;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Exceptions.StatementException;
import Domain.ProgramState.ProgramState;
import Domain.Value.RefValue;
import Domain.Value.IValue;
import Repository.IRepository;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Controller {
	IRepository repository;
	boolean displayFlag = false;
	ExecutorService executorService;

	public void setDisplayFlag(boolean value) {
		this.displayFlag = value;
	}

	public Controller(IRepository repository) {
		this.repository = repository;
	}

	public List<Integer> getAddrFromSymTable(Collection<IValue> symTableValues) {
		return symTableValues.stream()
				.filter(v -> v instanceof RefValue)
				.map(v -> {RefValue v1 = (RefValue) v; return v1.getAddress();})
				.collect(Collectors.toList());
	}

	public List<Integer> getAddrFromHeap(Collection<IValue> heapValues) {
		return heapValues.stream()
				.filter(v -> v instanceof RefValue)
				.map(v -> {RefValue v1 = (RefValue) v; return v1.getAddress();})
				.collect(Collectors.toList());
	}

	public Map<Integer, IValue> safeGarbageCollector(List<Integer> symTableAddr, List<Integer> heapAddr, Map<Integer, IValue> heap) {
		return heap.entrySet().stream()
				.filter(e -> ( symTableAddr.contains(e.getKey()) || heapAddr.contains(e.getKey())))
				.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
	}

	public void oneStepForAllPrograms(List<ProgramState> programStates) throws InterruptedException, ExpressionException, ADTException, StatementException, IOException{
		programStates.forEach(programState -> {
			try {
				repository.logPrgStaExe(programState);
				display(programState);
			} catch (IOException | ADTException e) {
				System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
			}
		});
		List<Callable<ProgramState>> callList = programStates.stream()
				.map((ProgramState p) -> (Callable<ProgramState>) (p::oneStep))
				.collect(Collectors.toList());

		List<ProgramState> newProgramList = executorService.invokeAll(callList).stream()
				.map(future -> {
					try {
						return future.get();
					} catch (ExecutionException | InterruptedException e) {
						System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
					}
					return null;
				})
				.filter(Objects::nonNull)
				.collect(Collectors.toList());

		programStates.addAll(newProgramList);

		programStates.forEach(programState -> {
			try {
				repository.logPrgStaExe(programState);
			} catch (IOException | ADTException e) {
				System.out.println("\u001B[31m" + e.getMessage() + "\u001B[0m");
			}
		});
		repository.setProgramStates(programStates);
	}

	public void allStep() throws InterruptedException, ExpressionException, ADTException, StatementException, IOException {
		executorService = Executors.newFixedThreadPool(2);
		List<ProgramState> programStates = removeCompletedPrg(repository.getProgramList());
		while (programStates.size() > 0) {
			conservativeGarbageCollector(programStates);
			oneStepForAllPrograms(programStates);
			programStates = removeCompletedPrg(repository.getProgramList());
		}
		executorService.shutdownNow();
		repository.setProgramStates(programStates);
	}

	public void conservativeGarbageCollector(List<ProgramState> programStates) {
		List<Integer> symTableAddresses = Objects.requireNonNull(programStates.stream()
						.map(p -> getAddrFromSymTable(p.getSymTable().values()))
						.map(Collection::stream)
						.reduce(Stream::concat).orElse(null))
				.collect(Collectors.toList());
		programStates.forEach(p -> {
			p.getHeap().setContent((HashMap<Integer, IValue>) safeGarbageCollector(symTableAddresses, getAddrFromHeap(p.getHeap().getContent().values()), p.getHeap().getContent()));
		});
	}

	private void display(ProgramState programState) {
		if (displayFlag) {
			System.out.println(programState.toString());
		}
	}

	public List<ProgramState> removeCompletedPrg(List<ProgramState> inPrgList) {
		return inPrgList.stream().filter(p -> !p.isNotCompleted()).collect(Collectors.toList());
	}
}