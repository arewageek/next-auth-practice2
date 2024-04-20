/*
  Warnings:

  - You are about to drop the column `passport` on the `users` table. All the data in the column will be lost.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" DATETIME,
    "phone" TEXT,
    "image" TEXT,
    "password" TEXT NOT NULL
);
INSERT INTO "new_users" ("email", "email_verified", "firstName", "id", "image", "lastName", "phone") SELECT "email", "email_verified", "firstName", "id", "image", "lastName", "phone" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
