-- CreateTable
CREATE TABLE "budget" (
    "title" TEXT NOT NULL,
    "Item_quantity" TEXT NOT NULL,
    "Item_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("title")
);
