package View;

import Exceptions.ADTException;
import Domain.Utilities.IDictionary;
import Domain.Utilities.MyDictionary;

import java.util.Scanner;

// Class that implements the menu of the interpreter
public class TextMenu {
	private IDictionary<String, Command> commands;

	public TextMenu() {
		commands = new MyDictionary<>();
	}

	public void addCommand(Command command) {
		commands.put(command.getKey(), command);
	}

	public void printMenu() {
		for (Command command : commands.values()) {
			String line = String.format("%4s : %s", command.getKey(), command.getDescription());
			System.out.println(line);
		}
	}

	public void show() {
		Scanner scanner = new Scanner(System.in);
		System.out.println("The Toy Language Interpreter!");

		while (true) {
			printMenu();
			System.out.println("Input the option: ");
			String key = scanner.nextLine();

			try {
				Command command = commands.lookUp(key);
				command.execute();
			} catch (ADTException exception) {
				System.out.println("Invalid option!");
			}
		}
	}
}