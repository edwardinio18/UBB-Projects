// 3. In a service there are cars, trucks and
// motorcycles in repair. Display all vehicles that
// have a repair cost greater than 1000Ron.

import Controller.*;
import Repo.*;
import Model.*;
import View.*;

public class Main {
	public static void main(String[] args) throws Exception {
		Repo repo = new Repo();
		Controller cont = new Controller(repo);
		View view = new View(cont);
		view.start();
	}
}