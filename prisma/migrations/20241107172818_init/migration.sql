-- CreateTable
CREATE TABLE "FormStateItem" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "recipientAddress" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "zone" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "FormStateItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormListBox" (
    "id" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "lengthValue" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "formStateItemId" INTEGER NOT NULL,

    CONSTRAINT "FormListBox_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormListBox" ADD CONSTRAINT "FormListBox_formStateItemId_fkey" FOREIGN KEY ("formStateItemId") REFERENCES "FormStateItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
