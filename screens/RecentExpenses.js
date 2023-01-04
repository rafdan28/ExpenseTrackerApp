import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays, getFormattedDate} from "../util/date";
import {useContext} from "react";

function RecentExpenses(){
    const expensesCtx = useContext(ExpensesContext);
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        const date = getFormattedDate(expense.date);
        const date7DaysAgo2 = getFormattedDate(date7DaysAgo);
        return (date > date7DaysAgo2) && (date <= today);
    })
    return (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days"/>
    );
}

export default RecentExpenses;