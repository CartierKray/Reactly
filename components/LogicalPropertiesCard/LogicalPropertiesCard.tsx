import Image from "next/image";

export const LogicalPropertiesCard = () => (
  <div className="@container isolate flex flex-col gap-2 overflow-hidden rounded-2xl bg-white p-2 outline outline-gray-950/5 dark:bg-gray-950 dark:outline-white/10">
    <div className="flex flex-col gap-6 p-6 @md:flex-row @md:gap-x-8 @md:p-8">
      <div className="flex h-18 w-28 shrink-0 items-center justify-center">
        <Image
          src="/icons/logical.svg"
          alt="Logical icon"
          width={72}
          height={72}
          className="text-gray-950 dark:text-white"
        />
      </div>
      <div>
        <span className="text-xl font-medium text-gray-950 @md:text-2xl dark:text-white">
          Logical properties
        </span>
        <p className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          Supporting multiple language text directions is no longer a nightmare.
        </p>
      </div>
    </div>
    <div className="flex-1"></div>
    <div className="h-112 relative overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
      <div className="flex px-8 pt-8">
        <div className="w-full -translate-x-4">
          <div className="font-mono text-[13px] text-gray-950 dark:text-white">
            ltr
          </div>
        </div>
        <div className="w-full translate-x-4 translate-y-20 text-right">
          <div className="font-mono text-[13px] text-gray-950 dark:text-white">
            rtl
          </div>
        </div>
      </div>
      <div className="@container relative isolate flex h-full items-center justify-center">
        <div className="absolute bottom-12 -left-2 z-1 w-[60cqw] shrink-0 divide-y divide-gray-950/5 rounded-xl bg-white shadow-2xl inset-ring inset-ring-gray-950/5 dark:divide-white/5 dark:bg-gray-800 dark:inset-ring-white/5">
          {[
            "Will Winton",
            "Kristin Yardly",
            "Emanual Cuccittini",
            "Kiara Smith",
          ].map((name, i) => (
            <div key={i} className="flex items-center justify-start gap-4 p-6">
              <div className="shrink-0">
                <Image
                  alt=""
                  src={`/avatars/avatar-${i + 4}.png`}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full bg-gray-950/5 outline -outline-offset-1 outline-gray-950/10 dark:outline-white/10"
                />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium text-gray-950 dark:text-white">
                  {name}
                </span>
                <span className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {
                    [
                      "Director of Operations",
                      "Marketing Coordinator",
                      "Staff Engineer",
                      "VP of Engineering",
                    ][i]
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute -right-3 bottom-12 w-[50cqw] shrink-0 divide-y divide-gray-950/5 rounded-xl bg-white shadow-2xl inset-ring inset-ring-gray-950/5 dark:divide-white/5 dark:bg-gray-800 dark:inset-ring-white/5">
          {["سارة أحمد", "علي محمد", "خالد عمر"].map((name, i) => (
            <div
              key={i}
              dir="rtl"
              className="flex items-center justify-start gap-4 p-6"
            >
              <div className="shrink-0">
                <Image
                  alt=""
                  src={`/avatars/avatar-${i + 1}.png`}
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full bg-gray-950/5 outline -outline-offset-1 outline-gray-950/10 dark:outline-white/10"
                />
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium text-gray-950 dark:text-white">
                  {name}
                </span>
                <span className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {["مديرة مشاريع", "مطور برمجيات", "مصمم واجهات المستخدم"][i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export const ContainerQueriesCard = () => (
  <div className="@container isolate flex flex-col gap-2 overflow-hidden rounded-2xl bg-white p-2 outline outline-gray-950/5 dark:bg-gray-950 dark:outline-white/10">
    <div className="flex flex-col gap-6 p-6 @md:flex-row @md:gap-x-8 @md:p-8">
      <div className="flex h-18 w-28 shrink-0 items-center justify-center">
        <Image
          src="/icons/container.svg"
          alt="Container icon"
          width={72}
          height={72}
          className="text-gray-950 dark:text-white"
        />
      </div>
      <div>
        <span className="text-xl font-medium text-gray-950 @md:text-2xl dark:text-white">
          Container queries
        </span>
        <p className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
          Tag an element as a container to let children adapt to changes in its
          size.
        </p>
      </div>
    </div>
    <div className="flex-1"></div>
    <div className="h-112 p-4 sm:p-8 relative overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10">
      <div className="-mr-16 -mb-16">
        <div className="rounded-xl bg-gray-950">
          <div className="rounded-xl p-1 text-sm scheme-dark dark:inset-ring dark:inset-ring-white/10">
            <div className="flex gap-2 p-2">
              <span className="size-3 rounded-full bg-white/20"></span>
              <span className="size-3 rounded-full bg-white/20"></span>
              <span className="size-3 rounded-full bg-white/20"></span>
            </div>
            <pre className="text-[13px] text-white p-3">
              {`<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-2">
    <img src="/img/photo-1.jpg" class="aspect-square @sm:aspect-3/2 object-cover" />
    <img src="/img/photo-2.jpg" class="aspect-square @sm:aspect-3/2 object-cover" />
    <img src="/img/photo-3.jpg" class="aspect-square @sm:aspect-3/2 object-cover" />
    <img src="/img/photo-4.jpg" class="aspect-square @sm:aspect-3/2 object-cover" />
  </div>
</div>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
);
