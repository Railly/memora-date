export type UpdateAvatarParams = {
  avatar: { image: any };
  user?: { user_id: string; full_name: string; avatar_url: string };
};
