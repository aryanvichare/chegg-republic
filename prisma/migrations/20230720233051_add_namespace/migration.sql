/*
  Warnings:

  - A unique constraint covering the columns `[namespace]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Document_namespace_key" ON "Document"("namespace");
