import { DashboardPage } from "src/app/schema/dashboard";
import { StorageService } from "src/app/services/storage.service";

export async function DashBoardMigrations(storage: StorageService) {
  const dash = (await storage.get("dashboard")) as any;

  if (!dash) return;

  if (!dash.pages) {
    dash.pages = [{ id: "0", cards: [] } as DashboardPage];
  }

  dash.pages.forEach((page: any, i: number) => {
    page.id = String(page.id);
    if (!page.title) page.title = "Stránka " + page.id;
    if (!page.cards) page.cards = [];
  });

  if (dash.cards && dash.pages) {
    dash.cards.forEach((card: any) => {
      const page = card.page ? dash.pages.find((item: any) => item.id === card.page) || dash.pages[0] : dash.pages[0];
      if (!page.cards) page.cards = [];
      page.cards.push(card);
    });
    delete dash.cards;
  }

  storage.set("dashboard", dash);
}
