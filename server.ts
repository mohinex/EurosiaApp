import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "eurosia-secret-key-2025";
const SUPER_ADMIN_KEY = process.env.SUPER_ADMIN_KEY || "eurosia_master_2024";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(morgan("dev"));

  // --- Auth Middleware ---
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };

  // --- PUBLIC APIs ---

  app.get("/api/site/settings", async (req, res) => {
    try {
      const settings = await prisma.siteSetting.findMany({ where: { status: "active" } });
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });

  app.get("/api/site/theme", async (req, res) => {
    try {
      const theme = await prisma.themeSetting.findFirst({ where: { status: "active", companyId: null } });
      res.json(theme || { primaryColor: "#B91C1C", secondaryColor: "#000000" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch theme" });
    }
  });

  app.get("/api/menus", async (req, res) => {
    try {
      const menus = await prisma.navigationMenu.findMany({ where: { status: "active" }, orderBy: { sortOrder: "asc" } });
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menus" });
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    try {
      const page = await prisma.page.findUnique({ where: { slug: req.params.slug }, include: { seoSettings: true } });
      if (!page) return res.status(404).json({ error: "Page not found" });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch page" });
    }
  });

  app.get("/api/sections/:pageId", async (req, res) => {
    try {
      const sections = await prisma.pageSection.findMany({ 
        where: { pageId: req.params.pageId, status: "active" },
        orderBy: { sortOrder: "asc" },
        include: { blocks: true }
      });
      res.json(sections);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sections" });
    }
  });

  app.get("/api/apps", async (req, res) => {
    try {
      const apps = await prisma.productApp.findMany({ where: { status: "active" }, orderBy: { sortOrder: "asc" } });
      res.json(apps);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch apps" });
    }
  });

  app.get("/api/apps/:slug", async (req, res) => {
    try {
      const appMod = await prisma.appModule.findUnique({ 
        where: { slug: req.params.slug },
        include: { features: true }
      });
      if (!appMod) return res.status(404).json({ error: "App not found" });
      res.json(appMod);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch app details" });
    }
  });

  app.get("/api/pricing", async (req, res) => {
    try {
      const plans = await prisma.pricingPlan.findMany({ 
        where: { status: "active" },
        include: { features: true, package: true },
        orderBy: { sortOrder: "asc" }
      });
      res.json(plans);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch pricing" });
    }
  });

  app.get("/api/footer", async (req, res) => {
    try {
      const footer = await prisma.footerColumn.findMany({
        where: { status: "active" },
        include: { links: true },
        orderBy: { sortOrder: "asc" }
      });
      res.json(footer);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch footer" });
    }
  });

  app.get("/api/seo/:pageSlug", async (req, res) => {
    try {
      const page = await prisma.page.findUnique({ 
        where: { slug: req.params.pageSlug },
        include: { seoSettings: true }
      });
      res.json(page?.seoSettings || {});
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch SEO settings" });
    }
  });

  // --- ADMIN APIs ---

  // Pages
  app.post("/api/admin/pages", authenticateToken, async (req, res) => {
    try {
      const page = await prisma.page.create({ data: req.body });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to create page" });
    }
  });

  app.patch("/api/admin/pages/:id", authenticateToken, async (req, res) => {
    try {
      const page = await prisma.page.update({ where: { id: req.params.id }, data: req.body });
      res.json(page);
    } catch (error) {
      res.status(500).json({ error: "Failed to update page" });
    }
  });

  app.delete("/api/admin/pages/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.page.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete page" });
    }
  });

  // Sections
  app.post("/api/admin/sections", authenticateToken, async (req, res) => {
    try {
      const section = await prisma.pageSection.create({ data: req.body });
      res.json(section);
    } catch (error) {
      res.status(500).json({ error: "Failed to create section" });
    }
  });

  app.patch("/api/admin/sections/:id", authenticateToken, async (req, res) => {
    try {
      const section = await prisma.pageSection.update({ where: { id: req.params.id }, data: req.body });
      res.json(section);
    } catch (error) {
      res.status(500).json({ error: "Failed to update section" });
    }
  });

  app.delete("/api/admin/sections/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.pageSection.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete section" });
    }
  });

  // Apps
  app.post("/api/admin/apps", authenticateToken, async (req, res) => {
    try {
      const appMod = await prisma.appModule.create({ data: req.body });
      res.json(appMod);
    } catch (error) {
      res.status(500).json({ error: "Failed to create app" });
    }
  });

  app.patch("/api/admin/apps/:id", authenticateToken, async (req, res) => {
    try {
      const appMod = await prisma.appModule.update({ where: { id: req.params.id }, data: req.body });
      res.json(appMod);
    } catch (error) {
      res.status(500).json({ error: "Failed to update app" });
    }
  });

  app.delete("/api/admin/apps/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.appModule.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete app" });
    }
  });

  // Pricing
  app.post("/api/admin/pricing", authenticateToken, async (req, res) => {
    try {
      const plan = await prisma.pricingPlan.create({ data: req.body });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to create pricing plan" });
    }
  });

  app.patch("/api/admin/pricing/:id", authenticateToken, async (req, res) => {
    try {
      const plan = await prisma.pricingPlan.update({ where: { id: req.params.id }, data: req.body });
      res.json(plan);
    } catch (error) {
      res.status(500).json({ error: "Failed to update pricing plan" });
    }
  });

  app.delete("/api/admin/pricing/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.pricingPlan.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete pricing plan" });
    }
  });

  // Media
  app.post("/api/admin/media/upload", authenticateToken, async (req, res) => {
    // Simple mock upload
    res.json({ url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" });
  });

  // Settings & Theme
  app.patch("/api/admin/theme", authenticateToken, async (req, res) => {
    try {
      const theme = await prisma.themeSetting.upsert({
        where: { id: req.body.id || 'global-theme' },
        create: { ...req.body, id: 'global-theme' },
        update: req.body
      });
      res.json(theme);
    } catch (error) {
      res.status(500).json({ error: "Failed to update theme" });
    }
  });

  app.patch("/api/admin/settings", authenticateToken, async (req, res) => {
    try {
      const { key, value } = req.body;
      const setting = await prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value }
      });
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update site settings" });
    }
  });

  // Companies
  app.post("/api/admin/companies", authenticateToken, async (req, res) => {
    try {
      const company = await prisma.company.create({ data: req.body });
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to create company" });
    }
  });

  app.patch("/api/admin/companies/:id", authenticateToken, async (req, res) => {
    try {
      const company = await prisma.company.update({ where: { id: req.params.id }, data: req.body });
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to update company" });
    }
  });

  app.delete("/api/admin/companies/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.company.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete company" });
    }
  });

  // Users
  app.post("/api/admin/users", authenticateToken, async (req, res) => {
    try {
      const { password, ...rest } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({ data: { ...rest, passwordHash } });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.patch("/api/admin/users/:id", authenticateToken, async (req, res) => {
    try {
      const user = await prisma.user.update({ where: { id: req.params.id }, data: req.body });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.user.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // Licenses
  app.post("/api/admin/licenses", authenticateToken, async (req, res) => {
    try {
      const license = await prisma.license.create({ data: req.body });
      res.json(license);
    } catch (error) {
      res.status(500).json({ error: "Failed to create license" });
    }
  });

  app.patch("/api/admin/licenses/:id", authenticateToken, async (req, res) => {
    try {
      const license = await prisma.license.update({ where: { id: req.params.id }, data: req.body });
      res.json(license);
    } catch (error) {
      res.status(500).json({ error: "Failed to update license" });
    }
  });

  app.post("/api/admin/licenses/:id/block", authenticateToken, async (req, res) => {
    try {
      const license = await prisma.license.update({ where: { id: req.params.id }, data: { status: "blocked" } });
      res.json(license);
    } catch (error) {
      res.status(500).json({ error: "Failed to block license" });
    }
  });

  app.post("/api/admin/licenses/:id/renew", authenticateToken, async (req, res) => {
    try {
      const { expiryDate } = req.body;
      const license = await prisma.license.update({ where: { id: req.params.id }, data: { expiryDate: new Date(expiryDate), status: "active" } });
      res.json(license);
    } catch (error) {
      res.status(500).json({ error: "Failed to renew license" });
    }
  });

  // Payments
  app.post("/api/admin/payment-methods", authenticateToken, async (req, res) => {
    try {
      const method = await prisma.paymentMethod.create({ data: req.body });
      res.json(method);
    } catch (error) {
      res.status(500).json({ error: "Failed to create payment method" });
    }
  });

  app.patch("/api/admin/payment-methods/:id", authenticateToken, async (req, res) => {
    try {
      const method = await prisma.paymentMethod.update({ where: { id: req.params.id }, data: req.body });
      res.json(method);
    } catch (error) {
      res.status(500).json({ error: "Failed to update payment method" });
    }
  });

  app.delete("/api/admin/payment-methods/:id", authenticateToken, async (req, res) => {
    try {
      await prisma.paymentMethod.delete({ where: { id: req.params.id } });
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete payment method" });
    }
  });

  // --- EXISTING Auth & Sync API STUBS (Adjusted for consistency) ---

  // --- Auth API ---
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName, companyName } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const company = await prisma.company.create({
        data: { name: companyName }
      });

      // Find or create a default role for tenants
      let role = await prisma.role.findUnique({ where: { name: "TENANT_ADMIN" } });
      if (!role) {
        role = await prisma.role.create({
          data: { name: "TENANT_ADMIN", description: "Tenant Administrator" }
        });
      }

      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          roleId: role.id,
          companyId: company.id
        }
      });

      const token = jwt.sign({ userId: user.id, companyId: company.id, role: role.name }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, firstName, lastName, role: role.name } });
    } catch (error) {
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password, ownerKey } = req.body;

      // Master Super Admin Override
      if (ownerKey === SUPER_ADMIN_KEY) {
        let superAdmin = await prisma.user.findFirst({ 
          where: { role: { name: "SUPER_ADMIN" } },
          include: { role: true }
        });

        if (!superAdmin) {
          const role = await prisma.role.upsert({
            where: { name: "SUPER_ADMIN" },
            update: {},
            create: { name: "SUPER_ADMIN", description: "System Super Admin" }
          });
          superAdmin = await prisma.user.create({
            data: {
              email: "owner@eurosia.com",
              passwordHash: await bcrypt.hash(SUPER_ADMIN_KEY, 10),
              firstName: "Owner",
              lastName: "Admin",
              roleId: role.id
            },
            include: { role: true }
          });
        }

        const token = jwt.sign({ userId: superAdmin.id, role: "SUPER_ADMIN" }, JWT_SECRET);
        return res.json({ 
          token, 
          user: { 
            id: superAdmin.id, 
            email: superAdmin.email, 
            firstName: superAdmin.firstName, 
            lastName: superAdmin.lastName, 
            role: "SUPER_ADMIN" 
          } 
        });
      }

      const user = await prisma.user.findUnique({ where: { email }, include: { company: true, role: true } });
      
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, companyId: user.companyId, role: user.role.name }, JWT_SECRET);
      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName, 
          role: user.role.name,
          company: user.company
        } 
      });
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await prisma.user.findUnique({ 
        where: { id: req.user.userId },
        include: { company: true, role: true }
      });
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch profile" });
    }
  });

  // --- Admin/Dashboard API ---
  app.get("/api/admin/stats", authenticateToken, async (req: any, res) => {
    res.json({
      totalCompanies: 1248,
      totalUsers: 24532,
      activeSubscriptions: 2845,
      monthlyRevenue: 48650,
      paymentSuccess: 96.8
    });
  });

  app.get("/api/admin/activities", authenticateToken, async (req: any, res) => {
    res.json([
      { id: 1, type: "Company", text: "New company 'Tech Solutions Ltd.' registered", time: "2 minutes ago", status: "Active" },
      { id: 2, type: "Payment", text: "Payment received from 'Alpha Traders'", time: "15 minutes ago", amount: 1299 },
      { id: 3, type: "User", text: "New user 'John Doe' added", time: "25 minutes ago", status: "Active" }
    ]);
  });

  // --- Sync API ---
  app.get("/api/sync/pull", authenticateToken, async (req: any, res) => {
    const { updatedAfter } = req.query;
    const date = updatedAfter ? new Date(updatedAfter as string) : new Date(0);

    try {
      const [pages, menus, apps, plans, companies, users] = await Promise.all([
        prisma.page.findMany({ where: { updatedAt: { gt: date } } }),
        prisma.navigationMenu.findMany({ where: { updatedAt: { gt: date } } }),
        prisma.productApp.findMany({ where: { updatedAt: { gt: date } } }),
        prisma.pricingPlan.findMany({ where: { updatedAt: { gt: date } } }),
        prisma.company.findMany({ where: { updatedAt: { gt: date } } }),
        prisma.user.findMany({ where: { updatedAt: { gt: date } } }),
      ]);

      res.json({
        pages,
        menus,
        apps,
        plans,
        companies,
        users,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      res.status(500).json({ error: "Sync pull failed" });
    }
  });

  app.post("/api/sync/push", authenticateToken, async (req: any, res) => {
    const { changes } = req.body; 
    const results: any[] = [];

    try {
      for (const change of changes) {
        const { entity, action, data } = change;
        const model = (prisma as any)[entity];
        
        if (!model) continue;

        if (action === "DELETE") {
          await model.update({
            where: { id: data.id },
            data: { status: "deleted", updatedAt: new Date() }
          });
        } else {
          // Upsert logic
          const existing = await model.findUnique({ where: { id: data.id } });
          
          if (existing && new Date(existing.updatedAt) > new Date(data.updatedAt)) {
            results.push({ id: data.id, entity, status: "CONFLICT", serverData: existing });
            continue;
          }

          await model.upsert({
            where: { id: data.id },
            create: { ...data, updatedAt: new Date() },
            update: { ...data, updatedAt: new Date() }
          });
        }
        
        await prisma.auditLog.create({
          data: {
            entity,
            entityId: data.id,
            action,
            userId: req.user.userId,
            companyId: req.user.companyId
          }
        });
        
        results.push({ id: data.id, entity, status: "SUCCESS" });
      }

      res.json({ results, timestamp: new Date().toISOString() });
    } catch (error) {
      res.status(500).json({ error: "Sync push failed" });
    }
  });

  app.get("/api/sync/status", authenticateToken, async (req: any, res) => {
    const count = await prisma.auditLog.count({
      where: { companyId: req.user.companyId }
    });
    res.json({ totalChanges: count, lastSync: new Date().toISOString() });
  });

  // --- Contact API (Stub for legacy) ---
  app.post("/api/contact", async (req, res) => {
    try {
      res.json({ success: true, message: "Stubbed" });
    } catch (error) {
      res.status(500).json({ error: "Failed to submit message" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
