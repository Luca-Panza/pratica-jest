-- CreateTable
CREATE TABLE "fruits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "fruits_pkey" PRIMARY KEY ("id")
);
