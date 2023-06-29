import fs from "fs/promises";
import path from "path";
import { createController } from "../src/generator/controller";
jest.mock("fs/promises");

describe("createController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should call fs.writeFile with correct arguments", async () => {
    const name = "test";
    const structure = "module";

    await createController(name, structure);

    const expectedPath = path.resolve(
      process.cwd(),
      `./src/modules/${name}/controllers/${name}.controller.ts`
    );
    expect(fs.writeFile).toHaveBeenCalledWith(expectedPath, expect.any(String));
  });

  it("should throw error if fs.writeFile fails", async () => {
    (fs.writeFile as jest.Mock).mockRejectedValue(
      new Error("Write file error")
    );

    await expect(createController("test", "module")).rejects.toThrow(
      "Write file error"
    );
  });
  it("should not throw error if directory already exists", async () => {
    const name = "test";
    const structure = "module";

    // Simulate the situation where the directory already exists
    await createController(name, structure);
    await expect(createController(name, structure)).resolves.not.toThrow();
  });
  it("should write file in correct location for role structure", async () => {
    const name = "test";
    const structure = "role";

    await createController(name, structure);

    const expectedPath = path.resolve(
      process.cwd(),
      `./src/controllers/${name}.controller.ts`
    );
    expect(fs.writeFile).toHaveBeenCalledWith(expectedPath, expect.any(String));
  });
});
