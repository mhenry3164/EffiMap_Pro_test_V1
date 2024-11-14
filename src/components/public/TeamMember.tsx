interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
}

export default function TeamMember({ name, role, image }: TeamMemberProps) {
  return (
    <div className="text-center">
      <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto mb-4">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400">
            <svg
              className="h-20 w-20"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{name}</h3>
      <p className="text-sm text-gray-500">{role}</p>
    </div>
  );
}
